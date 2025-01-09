const DEV = false;
const root = document.getElementById("root");
const WIP_MESSAGE = "Work in progress...";

// Routing
const routePathnames = {
  HOME: "/",
  RESUME: "/Resume",
  CS_CAPSTONE: "/Spend-Sense-Info",
  SE_CAPSTONE: "/Dungeon-Explorer-Info",
};

const routes = [
  { path: routePathnames.HOME, page: () => loadStaticContent("HOME") },
  { path: routePathnames.RESUME, page: () => loadStaticContent("RESUME") },
  { path: routePathnames.CS_CAPSTONE, page: () => loadStaticContent("CS_CAPSTONE") },
  { path: routePathnames.SE_CAPSTONE, page: () => loadStaticContent("SE_CAPSTONE") },
];

const pageNames = {
  HOME: "/home.html",
  RESUME: "/resume.html",
  CS_CAPSTONE: "/cs_capstone.html",
  SE_CAPSTONE: "/se_capstone.html",
};

const localHistory = [];

window.onload = function(e) {
  initialize();
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  route(pathname, hash);
};

function route(pathname, hash, back) {
  const path = routePathnames[pathname];
  const route = routes.find((r) => r.path == path);
  if (route) {
    if (hash && hash.length > 1) {
      route.page(hash.substring(1));
    } else {
      route.page();
    }
    if (!back) {
      localHistory.push({ pathname: pathname, hash: hash });
      window.history.pushState({}, "", pageNames[pathname]);
    }
  } else {
    routes[0].page();
    if (!back) {
      localHistory.push({ path: routes[0].path, hash: hash });
      window.history.pushState({}, "", path);
    }
  }
}

window.onpopstate = function(e) {
  e.preventDefault();
  if (localHistory.length <= 1) {
    window.history.back();
  }
  localHistory.pop();
  const last = localHistory[localHistory.length - 1];
  route(last.pathname, last.hash, true);
}

// sideNav functionality
function openNav() {
  root.style.marginLeft = "250px";
  document.getElementById("mainMenuContainer").style.display = "block";
}

function closeNav() {
  root.style.marginLeft = "0";
  document.getElementById("mainMenuContainer").style.display = "none";
}

function invertNavContainer() {
  document.querySelectorAll(".bar").forEach((bar) => {
    bar.classList.toggle("changed");
  });
}

// Page loading functions
async function loadStaticContent(pageName) {
  // const pageNames prevents loading arbitrary files (sanity checking)
  let page = pageNames[pageName];
  if (!page) {
    if (DEV) {
      console.log("Called loadStaticContent with unrecognized argument ", pageName);
    }
    alert("Failed to locate file '" + pageName + "'; loading default...");
    page = pageNames["RESUME"];
  }
  const response = await fetch(page, { cache: "no-store" });
  root.innerHTML = "";
  root.innerHTML = await response.text();
  closeNav();
}

async function initialize() {
  const navContainer = document.getElementById("showNavContainer");
  navContainer.onclick = openNav;
  navContainer.onmouseenter = invertNavContainer;
  navContainer.onmouseleave = invertNavContainer;
  document.getElementById("closeNavButton").onclick = closeNav;
  document.getElementById("homeNavButton").onclick = () => route("HOME");
  document.getElementById("resumeNavButton").onclick = () => route("RESUME");
  //document.getElementById("csCapstoneNavButton").onclick = () => route("CS_CAPSTONE");
  //document.getElementById("seCapstoneNavButton").onclick = () => route("SE_CAPSTONE");
  const csCapstoneButton = document.getElementById("csCapstoneNavButton");
  const seCapstoneButton = document.getElementById("seCapstoneNavButton");
  csCapstoneButton.disabled = true;
  csCapstoneButton.onmouseenter = () => changeText(csCapstoneButton, WIP_MESSAGE);
  csCapstoneButton.onmouseleave = () => changeText(csCapstoneButton, "CS Capstone Project");
  seCapstoneButton.disabled = true;
  seCapstoneButton.onmouseenter = () => changeText(seCapstoneButton, WIP_MESSAGE);
  seCapstoneButton.onmouseleave = () => changeText(seCapstoneButton, "SE Capstone Project");
}

function changeText(element, newText, color) {
  element.innerHTML = newText;
}
