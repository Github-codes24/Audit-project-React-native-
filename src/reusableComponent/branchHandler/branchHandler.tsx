import { useEffect } from 'react';
import branch from 'react-native-branch';
import { navigationRef } from '../../../App';
import { MainRoutes } from '../../navigation/routeAndParamsList';

let pendingBranchParams: any = null;
let isMounted = true;

const BranchLinkHandler = () => {
  useEffect(() => {
    isMounted = true;

    const unsubscribe = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('❌ Branch error:', error);
        return;
      }

      console.log('📩 Branch link opened (live):', params);
      if (params?.['+clicked_branch_link']) {
        pendingBranchParams = params;
      }
    });

    const checkInitialBranchLink = async () => {
      const params = await branch.getLatestReferringParams();
      console.log('🧊 Initial Branch link params (cold start):', params);

      if (params?.['+clicked_branch_link']) {
        pendingBranchParams = params;
      }
    };

    checkInitialBranchLink();

    const navCheck = setInterval(() => {
      if (
        isMounted &&
        pendingBranchParams &&
        navigationRef.isReady()
      ) {
        const blogId = pendingBranchParams?.id;
        const screen = pendingBranchParams?.screen;

        if (screen === MainRoutes.BLOG_DETAILS_SCREEN && blogId) {
          console.log(`✅ Navigation is ready. Navigating to BlogDetails with ID:`, blogId);
          navigationRef.navigate({
            name: MainRoutes.BLOG_DETAILS_SCREEN,
            params: { id: String(blogId) },
            key: `blog-${blogId}`,
          });
          pendingBranchParams = null;
        } else {
          console.log(`⚠️ Invalid Branch link screen or missing ID:`, pendingBranchParams);
        }
      }
    }, 200);

    return () => {
      isMounted = false; // ✅ prevent navigate on unmounted ref
      unsubscribe();
      clearInterval(navCheck);
    };
  }, []);

  return null;
};

export default BranchLinkHandler;
