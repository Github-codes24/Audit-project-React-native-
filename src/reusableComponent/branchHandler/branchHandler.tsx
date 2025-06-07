import { useEffect } from 'react';
import branch from 'react-native-branch';
import { navigationRef } from '../../../App';
import { MainRoutes } from '../../navigation/routeAndParamsList';

const BranchLinkHandler = () => {
  useEffect(() => {
    // 🔁 Subscribe for branch link opens (while app is running or resumed)
    const unsubscribe = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('❌ Branch error:', error);
        return;
      }

      console.log('📩 Branch link opened with params (live):', params);

      handleBranchNavigation(params, 'live');
    });

    // ✅ Handle cold start by checking latest params
    const checkInitialBranchLink = async () => {
      const params = await branch.getLatestReferringParams();
      console.log('🧊 Initial Branch link params (cold start):', params);

      if (params?.['+clicked_branch_link']) {
        handleBranchNavigation(params, 'cold');
      }
    };

    checkInitialBranchLink();

    return () => unsubscribe();
  }, []);

  const handleBranchNavigation = (params: any, source: string) => {
    const blogId = params?.id;
    const screen = params?.screen;

    if (screen === MainRoutes.BLOG_DETAILS_SCREEN && blogId) {
      waitForNavAndNavigate(String(blogId), source);
    } else {
      console.log(`⚠️ Unsupported Branch screen or missing ID in ${source} link`);
    }
  };

  const waitForNavAndNavigate = (id: string, source: string) => {
    const interval = setInterval(() => {
      if (navigationRef.isReady()) {
        console.log(`✅ Navigation is ready (${source}). Navigating to BlogDetails with ID:`, id);
        navigationRef.navigate(MainRoutes.BLOG_DETAILS_SCREEN, { id });
        clearInterval(interval);
      } else {
        console.log(`⏳ Navigation not ready yet (${source})`);
      }
    }, 100);
  };

  return null;
};

export default BranchLinkHandler;
