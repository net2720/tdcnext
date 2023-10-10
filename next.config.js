module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*', // API 엔드포인트 경로 (원하는 경로에 맞게 수정하세요)
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // 모든 도메인을 허용하려면 '*' 사용
          },
        ],
      },
    ];
  },
};
