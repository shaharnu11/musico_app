const colors = ["red", "green", "blue", "yellow", "pink", "purple", "peru", "orange","brown","black"];
colors.sort((colorA, colorB) => 10 * Math.random() < Math.random() * 10);
export default colors;