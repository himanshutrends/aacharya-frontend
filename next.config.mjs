import { withHydrationOverlay } from "@builder.io/react-hydration-overlay/next";

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'i.ytimg.com'],
    },
};

// export default withHydrationOverlay({
//     /**
//      * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
//      * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
//      */
//     appRootSelector: "main",
//   })(nextConfig);

export default nextConfig;
