import { configure } from "@storybook/react";

// automatically import all files ending in *.stories.js
configure(require.context("../imports/ui", true, /\.stories\.js$/), module);
