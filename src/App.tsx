import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Court {
  id: number;
  name: string;
  address: string;
  homepage: string;
}
const courts: Court[] = [
  {
    id: 0,
    name: "가천대학교(글로벌)",
    address: "경기 성남시 수정구 성남대로 1342",
    homepage: "https://shareit.kr/venue/548",
  },
  {
    id: 1,
    name: "어시스트",
    address: "인천 남동구 고잔로102번길 50 어시스트 체육관",
    homepage: "https://shareit.kr/venue/6060",
  },
  {
    id: 2,
    name: "구리토평체육관",
    address: "경기 구리시 벌말로128번길 48",
    homepage: "https://shareit.kr/venue/3804",
  },
];

const App: React.FC = () => {
  const addressToLatLng = async (address: string) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const result = new Promise<void>((resolve, reject) => {
      geocoder.addressSearch(address, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(result[0]);
        } else {
          console.log("잘못된 주소 입력");
        }
      });
    });
    return result;
  };

  const setInfoWindow = (content: string, position: string) => {
    const iwContent = `<div style="padding:5px;">${content}</div>`;
    const infoWindow = new window.kakao.maps.InfoWindow({
      position,
      content: iwContent,
    });
    return infoWindow;
  };

  const setMarkerMouseEvent = (map: any, marker: any, infoWindow: any, court: Court) => {
    window.kakao.maps.event.addListener(marker, "click", function () {
      window.open(court.homepage);
    });
    window.kakao.maps.event.addListener(marker, "mouseover", function () {
      infoWindow.open(map, marker);
    });
    window.kakao.maps.event.addListener(marker, "mouseout", function () {
      infoWindow.close();
    });
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const defaultLatLng = new window.kakao.maps.LatLng(37.566826, 126.9786567);
      const container = document.getElementById("map");
      const options = {
        center: defaultLatLng,
        level: 10,
      };
      const map = new window.kakao.maps.Map(container, options);

      courts.map((court: Court) => {
        addressToLatLng(court.address).then((position: any) => {
          const latLng = new window.kakao.maps.LatLng(position.y, position.x);
          const marker = new window.kakao.maps.Marker({
            map,
            position: latLng,
            clickable: true,
          });

          const infoWindow = setInfoWindow(court.name, latLng);
          setMarkerMouseEvent(map, marker, infoWindow, court);
        });
      });
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "800px" }} />;
};

export default App;
