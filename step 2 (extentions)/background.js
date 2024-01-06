console.log("background is runnign");

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   let clickedTab = activeInfo.tabId;
//   console.log(clickedTab);

//   chrome.runtime.onMessage.addListener(function (
//     request,
//     sender,
//     sendResponse
//   ) {
//     if (request.greetings === "hello") {
//       // sendResponse({ currentTab: clickedTab });

//       sendResponse({ currentTab: clickedTab });
//     }
//   });
// });

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   let currentTabUrl = tabs[0].url;
//   console.log(currentTabUrl);
// });

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   let activeTabId = activeInfo.tabId;
//   chrome.tabs.get(activeTabId, function (tab) {
//     let tabTitle = tab.title;
//     chrome.runtime.onMessage.addListener();
//   });
// });

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   let clickedTab = activeInfo.tabId;
//   console.log(clickedTab);
// });

const websiteData = {};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    // Page load is complete, update the time spent
    let domain = changeDomain(tab.url);

    updateTimeForWebsite(domain);
  }
});

function updateTimeForWebsite(url) {
  // Get the current time
  const currentTime = new Date().getTime();

  // Check if the website is already in the data, if not, initialize it
  if (!websiteData[url]) {
    websiteData[url] = {
      totalTime: 0,
      lastVisit: currentTime,
    };
  } else {
    // Calculate the time spent since the last visit and add it to the total time
    const elapsedTime = currentTime - websiteData[url].lastVisit;
    websiteData[url].totalTime += elapsedTime;
    websiteData[url].lastVisit = currentTime;
  }
  console.log(
    `Time spent on ${url}: ${websiteData[url].totalTime} milliseconds`
  );
}
function changeDomain(url) {
  let newstring = url.replace("https://", " ");
  newstring = newstring.replace("http://", " ");
  newstring = newstring.replace("www.", " ");

  return newstring.split(".")[0];
}
console.log(websiteData);
