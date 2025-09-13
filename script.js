// add a link to the stylesheet in the head of index.html
let head = document.getElementsByTagName("head");

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./style.css"; // Replace with your CSS file path
document.head.appendChild(link);

// Select and cache the <main> element in a variable named mainEl.
// If using getElementsByTagName("main"), returns an array so we must use [0]
const mainEl = document.getElementsByTagName("main")[0];

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = "var(--main-bg)";

// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
let mainElH1 = document.createElement("h1");
mainElH1.textContent = "DOM Manipulation"
mainEl.appendChild(mainElH1);

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add("flex-ctr");

// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
const topMenuEl = document.getElementById("top-menu");

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");

// Menu data structure
// Replace menuLinks array
const menuLinks = [
    { text: "about", href: "/about" },
    {
        text: "catalog",
        href: "#",
        subLinks: [
            { text: "all", href: "/catalog/all" },
            { text: "top selling", href: "/catalog/top" },
            { text: "search", href: "/catalog/search" },
        ],
    },
    {
        text: "orders",
        href: "#",
        subLinks: [
            { text: "new", href: "/orders/new" },
            { text: "pending", href: "/orders/pending" },
            { text: "history", href: "/orders/history" },
        ],
    },
    {
        text: "account",
        href: "#",
        subLinks: [
            { text: "profile", href: "/account/profile" },
            { text: "sign out", href: "/account/signout" },
        ],
    },
];

// Iterate over the entire menuLinks array and for each "link" object:

menuLinks.forEach((menuLink) => {
    // Create an <a> element.
    let anchor = document.createElement("a");

    // On the new element, add an href attribute with its value set to the href property of the "link" object.
    anchor.setAttribute("href", menuLink.href);

    // Set the new element's content to the value of the text property of the "link" object.
    anchor.innerHTML = menuLink.text; // or .textContent

    // Append the new element to the topMenuEl element.
    topMenuEl.appendChild(anchor);
});

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
// Set the height subMenuEl element to be "100%".
// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
// Add the class of flex-around to the subMenuEl element.

const subMenuEl = document.getElementById("sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// In order to add interaction:
// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
// Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault() method.
// The second line of code of the function should immediately return if the element clicked was not an <a> element.
// Log the content of the <a> to verify the handler is working.
// Progress Check - Ensure that clicking ABOUT, CATALOG, etc. logs about, catalog, etc. when a link is clicked. Clicking anywhere other than on a link should do nothing.

const topMenuLinks = topMenuEl.querySelectorAll("a");
topMenuEl.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName != "A") {
        return;
    } else {
        console.log(e.target.textContent);

        const targetObject = getObject(e.target.textContent);
        // console.log(targetObject);
        for (let i = 0; i < topMenuLinks.length; i++) {
            if (topMenuLinks[i].textContent == e.target.textContent) {
                e.target.classList.toggle("active");
                if (e.target.classList.contains("active")) {
                    removeSubMenu();
                    if (targetObject.subLinks) {
                        buildSubMenu(targetObject.subLinks);
                        subMenuEl.style.top = "100%";
                    } else {
                        mainElH1.textContent = e.target.textContent.toUpperCase();
                    }
                } else {
                    subMenuEl.style.top = "0";
                }

                // console.log("active", topMenuLinks[i]);
            } else {
                topMenuLinks[i].classList.remove("active");
                // console.log(topMenuLinks[i]);
            }
        }
    }
    
});


function getObject(name) {
    for (let i = 0; i < menuLinks.length; i++) {
        if (menuLinks[i].text === name) {
            return menuLinks[i];
        }
    }
}

function buildSubMenu(subLinks) {
    subLinks.forEach((subLink) => {
        // Create an <a> element.
        let anchor1 = document.createElement("a");

        // On the new element, add an href attribute with its value set to the href property of the "link" object.
        anchor1.setAttribute("href", subLink.href);

        // Set the new element's content to the value of the text property of the "link" object.
        anchor1.innerHTML = subLink.text; // or .textContent

        // Append the new element to the topMenuEl element.
        subMenuEl.appendChild(anchor1);
    });
}

function removeSubMenu() {
    const subMenuLinks = subMenuEl.querySelectorAll("a");
    subMenuLinks.forEach((subMenuLink) => {
        // Remove the subMenuLinks from subMenuEl.
        subMenuEl.removeChild(subMenuLink);
    });
    subMenuEl.style.top = "0";
}

subMenuEl.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName != "A") {
        return;
    } else {
      console.log(e.target.textContent);
      subMenuEl.style.top = "0";
      removeActive();
      mainElH1.textContent = e.target.textContent.toUpperCase();
    }
});

function removeActive() {
    const topMenuLinksA = topMenuEl.querySelectorAll("a");
    topMenuLinksA.forEach(topMenuLinkA => {
      topMenuLinkA.classList.remove("active");
    }) 
}