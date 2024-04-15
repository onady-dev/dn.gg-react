import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청 좌표
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 10, // 클러스터 할 최소 지도 레벨
      });
      clusterer.addMarkers([
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        }),
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.666826, 126.8786567),
        }),
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.566826, 126.8786567),
        }),
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(37.666826, 126.9786567),
        }),
      ]);
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "800px" }} />;
};

export default App;
