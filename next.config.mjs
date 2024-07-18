/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: ['ssl.pstatic.net', 'phinf.pstatic.net', 'localhost'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/map-reversegeocode/:path((?!auth).*)', // next-auth가 사용하는 기본 경로 예외 처리
  //       destination: 'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;