window.onload = async function() {
  await webgazer.setRegression('ridge')
               .setGazeListener((data, timestamp) => {
                 if (data) {
                   saveGaze(data.x, data.y, timestamp);
                 }
               })
               .begin();
};
function saveGaze(x, y, t) {
  const entry = `${new Date().toISOString()},${x},${y},${t}\n`;
  localStorage.gazeData = (localStorage.gazeData || "") + entry;
}
function isFixated(x, y) {
  const rect = document.getElementById("green-label")?.getBoundingClientRect();
  return rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}