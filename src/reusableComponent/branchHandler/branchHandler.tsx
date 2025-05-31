import { useEffect } from 'react';
import { Linking } from 'react-native';
import { navigationRef } from '../../../App';
import { MainRoutes } from '../../navigation/routeAndParamsList';
import { URL } from 'react-native-url-polyfill';

const BranchLinkHandler = () => {
  useEffect(() => {
    const handleInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      console.log('🔗 Linking.getInitialURL:', url);

      if (url) {
        try {
          const parsedUrl = new URL(url);
          const blogId = parsedUrl.searchParams.get('blogId');

          if (blogId) {
            const waitForNav = setInterval(() => {
              if (navigationRef.isReady()) {
                console.log('✅ Navigation ready — navigating to BLOG_DETAILS_SCREEN');
                navigationRef.navigate(MainRoutes?.BLOG_DETAILS_SCREEN, { id: blogId });
                clearInterval(waitForNav);
              } else {
                console.log('⏳ Waiting for navigation to be ready...');
              }
            }, 100);
          }
        } catch (e) {
          console.error('❌ Failed to parse URL:', e);
        }
      }
    };

    handleInitialUrl();
  }, []);

  return null;
};

export default BranchLinkHandler;
