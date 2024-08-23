//天気を取得ボタンを押したときの処理設定
document.getElementById("get-weather").addEventListener("click", function () {
  //選択された都市のコードを取得
  let cityCode = document.getElementById("city-select").value;

  //都市が選ばれていない場合アラートを表示させて終了する
  if (!cityCode) {
    alart("都市を選択してください");
    return;
  }

  //天気予報のAPIのURL
  let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

  //APIからデータを取得
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("天気情報の取得に失敗しました。");
      }
      return response.json();
    })

    .then(weather => {
      //必要な天気情報を抽出
      let area = weather[0].timeSeries[0].areas[0];
      let tempsArea = weather[1].tempAverage.areas[0];

      //HTMLの要素に天気情報を表示
      document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
      document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
      document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
      document.getElementById("today").lastElementChild.textContent = area.weathers[0];
      document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
      document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
      document.getElementById("todayHighTemperature").lastElementChild.textContent = tempsArea.max + "℃";
      document.getElementById("todayLowTemperature").lastElementChild.textContent = tempsArea.min + "℃";
    })
    .catch(error => {
      //エラーが発生した場合のアラート
      alert(error.message);
    });
});
