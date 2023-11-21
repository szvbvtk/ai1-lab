/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var directoryName = "css";
var fileNames = ["style1.css", "style2.css", "style3.css"];
var defaultFileName = fileNames[0];
function setCss() {
  var fileName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFileName;
  var _directoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : directoryName;
  var filePath = "".concat(_directoryName, "/").concat(fileName);
  var existingLink = document.querySelector("link[href*=\"".concat(_directoryName, "/\"]"));
  // existingLink && existingLink.remove();
  existingLink === null || existingLink === void 0 ? void 0 : existingLink.remove();
  var newLink = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.type = "text/css";
  newLink.href = filePath;
  document.head.appendChild(newLink);
}
function createLinkItem(fileName) {
  var _directoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : directoryName;
  var linkItem = document.createElement("a");
  linkItem.textContent = fileName;
  linkItem.href = "#";
  linkItem.onclick = function () {
    return setCss(fileName, _directoryName);
  };
  return linkItem;
}
function createLinkList() {
  var _fileNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fileNames;
  var _directoryName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : directoryName;
  var linkList = document.createElement("ul");
  linkList.className = "species_list";
  _fileNames.forEach(function (fileName) {
    var listItem = document.createElement("li");
    var linkItem = createLinkItem(fileName, _directoryName);
    listItem.appendChild(linkItem);
    linkList.appendChild(listItem);
  });
  return linkList;
}
// setCss();
var linkList = createLinkList();
var cssSwitcher = document.querySelector("#css-switcher");
if (cssSwitcher) {
  cssSwitcher.appendChild(linkList);
} else {
  console.log("Could not find css-switcher element in DOM");
}
/******/ })()
;