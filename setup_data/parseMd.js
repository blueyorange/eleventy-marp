const fs = require("fs");

function parseCategoryLine(line) {
  const regex = /^(#+)\s+((?:\d+\.?)+)\s+(.*)$/;
  const match = line.match(regex);

  if (match) {
    const ref = match[2];
    const title = match[3];

    return {
      ref,
      title,
    };
  }

  // Return null if the line does not match the expected format
  return null;
}

function parseCategories(text) {
  const lines = text.split("\n");
  const categories = [];
  for (const line of lines) {
    if (parseCategoryLine(line)) {
      categories.push(parseCategoryLine(line));
    }
  }
  return categories;
}

function getParentRef(category) {
  const parentRef = category.ref.split(".").slice(0, -1).join(".");
  return parentRef ? parentRef : null;
}

function getChildRefs(parent, categories) {
  const re = new RegExp(`^${parent.ref}\\.\\d+$`);
  return categories.reduce((children, category) => {
    const match = category.ref.match(re);
    if (match) {
      children.push(category.ref);
    }
    return children;
  }, []);
}

function createTreeFromRefs(categories) {
  return categories.map((category, _, categories) => {
    const { title, ref } = category;
    return {
      title,
      ref,
      parent: getParentRef(category),
      children: getChildRefs(category, categories),
    };
  });
}

function getLearningOutcomesFromMarkdown(text) {
  // Create a regular expression pattern to match learning outcomes starting with '-'
  const outcomeRe = /^\d\.\s+(.*)$/;
  const categoryRe = /^(#+)\s+((?:\d+\.?)+)\s+(.*)$/;

  const lines = text.split("\n");
  let currentCategory = "";
  const outcomes = [];

  for (let line of lines) {
    const matchCat = line.match(categoryRe);
    const matchOutcome = line.match(outcomeRe);
    if (matchCat) {
      currentCategory = matchCat[2];
    } else if (matchOutcome) {
      outcomes.push({ outcome: matchOutcome[1], ref: currentCategory });
    }
  }
  return outcomes;
}

// Read the file containing the outline
fs.readFile("OCRAOutcomes.md", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const categories = parseCategories(data);
  const tree = createTreeFromRefs(categories);
  const outcomes = getLearningOutcomesFromMarkdown(data);
  const output = { categories: tree, outcomes };
  const json = JSON.stringify(output);
  fs.writeFileSync("dataALevel.json", json, "utf-8");
  console.log(outcomes.length);
});
