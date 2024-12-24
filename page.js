const DEV = true;
const root = document.getElementById("root");

// Routing
const routePathnames = {
  HOME: "/",
  RESUME: "/Resume",
  CS_CAPSTONE: "/Spend-Sense-Info",
  SE_CAPSTONE: "/Dungeon-Explorer-Info",
};

// TODO prevent loading directly into any page except home
const routes = [
  { path: routePathnames.HOME, page: initialLoad },
  { path: routePathnames.RESUME, page: () => loadStaticContent("RESUME") },
  { path: routePathnames.CS_CAPSTONE, page: () => loadStaticContent("CS_CAPSTONE") },
  { path: routePathnames.SE_CAPSTONE, page: () => loadStaticContent("SE_CAPSTONE") },
];

const pageNames = {
  HOME: "./home.html",
  RESUME: "./resume.html",
  CS_CAPSTONE: "./cs_capstone.html",
  SE_CAPSTONE: "./se_capstone.html",
};

window.onload = function(e) {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  route(pathname, hash);
};

function route(pathname, hash) {
  const route = routes.find((r) => r.path == pathname);
  if (route) {
    if (hash && hash.length > 1) {
      route.page(hash.substring(1));
    } else {
      route.page();
    }
  } else {
    routes[0].page();
  }
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

async function initialLoad() {
  await loadStaticContent("HOME");
  const navContainer = document.getElementById("showNavContainer");
  navContainer.onclick = openNav;
  navContainer.onmouseenter = invertNavContainer;
  navContainer.onmouseleave = invertNavContainer;
  document.getElementById("closeNavButton").onclick = closeNav;
  document.getElementById("homeNavButton").onclick = () => loadStaticContent("HOME");
  document.getElementById("resumeNavButton").onclick = () => loadStaticContent("RESUME");
  document.getElementById("csCapstoneNavButton").onclick = () => loadStaticContent("CS_CAPSTONE");
  document.getElementById("seCapstoneNavButton").onclick = () => loadStaticContent("SE_CAPSTONE");
}
