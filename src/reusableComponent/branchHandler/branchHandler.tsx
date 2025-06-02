import { useEffect } from 'react';
import { Alert } from 'react-native';
import branch from 'react-native-branch';
import { navigationRef } from '../../../App';
import { MainRoutes } from '../../navigation/routeAndParamsList';

const BranchLinkHandler = () => {
  useEffect(() => {
    const unsubscribe = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('❌ Branch error:', error);
        return;
      }

      console.log('🔗 Branch params:', params);

      if (params['+clicked_branch_link']) {
        const blogId = params.blogId;

        if (blogId) {
          const waitForNav = setInterval(() => {
            if (navigationRef.isReady()) {
              console.log('✅ Navigation ready — navigating to BLOG_DETAILS_SCREEN');
              navigationRef.navigate(MainRoutes.BLOG_DETAILS_SCREEN, { id: blogId });
              clearInterval(waitForNav);
            } else {
              console.log('⏳ Waiting for navigation to be ready...');
            }
          }, 100);
        }
      }
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return null;
};

export default BranchLinkHandler;
