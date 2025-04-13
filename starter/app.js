const courseDivNode = document.getElementById("course-list");

fetch("https://cs272.cs.wisc.edu/rest/s25/ice/courses")
.then(res => res.json())
.then(courses => {
    courses
        .map(c => createCourseComponent(c))
        .forEach(n => courseDivNode.appendChild(n));
});

/**
 * Given some course data, returns a new HTML element.
 * @param {object} courseData the course data object
 * @returns an HTML element to be placed into the webpage
 */
function createCourseComponent(courseData) {
    const newColDivNode = document.createElement("div");
    newColDivNode.id = `course-${courseData.id}`;
    newColDivNode.className = "col-12 col-md-6 col-lg-4";
    
    const newCardDivNode = document.createElement("div");
    newCardDivNode.className = "card m-2 p-2";

    const newStarNode = document.createElement("span");
    newStarNode.style.float = "right";
    newStarNode.className = "bi-star";
    newStarNode.addEventListener("click", () => {
        if (newStarNode.className === "bi-star") {
            newStarNode.className = "bi-star-fill";
        } else {
            newStarNode.className = "bi-star";
        }
    })

    const newTitleNode = document.createElement("h2");
    newTitleNode.innerText = `${courseData.id}: ${courseData.name}`;

    const newCreditsNode = document.createElement("p");
    newCreditsNode.style.fontWeight = 200;
    newCreditsNode.innerText = `${courseData.credits} credits`;

    const newBadgesDivNode = document.createElement("div");
    newBadgesDivNode.style.display = "flex";
    courseData.keywords.forEach(word => {
        const newBadgeNode = document.createElement("p");
        newBadgeNode.className = "badge text-bg-secondary me-2";
        newBadgeNode.innerText = word;
        newBadgesDivNode.appendChild(newBadgeNode);
    });

    const newDescNode = document.createElement("p");
    newDescNode.innerText = courseData.description.substring(0, 200) + "...";

    const newReadMoreBtnNode = document.createElement("button");
    newReadMoreBtnNode.className = "btn btn-outline-secondary";
    newReadMoreBtnNode.innerText = "Read More";
    newReadMoreBtnNode.addEventListener("click", () => {
        if(newReadMoreBtnNode.innerText === "Read More") {
            newDescNode.innerText = courseData.description;
            newReadMoreBtnNode.innerText = "Read Less";
        } else {
            newDescNode.innerText = courseData.description.substring(0, 200) + "...";
            newReadMoreBtnNode.innerText = "Read More";
        }
    });

    newTitleNode.appendChild(newStarNode);

    newCardDivNode.appendChild(newTitleNode);
    newCardDivNode.appendChild(newCreditsNode);
    newCardDivNode.appendChild(newBadgesDivNode)
    newCardDivNode.appendChild(newDescNode);
    newCardDivNode.appendChild(newReadMoreBtnNode)

    newColDivNode.appendChild(newCardDivNode);

    return newColDivNode;
}
