import { Menu, MenuItem } from "@salt-ds/lab";

export const SingleLevelMenu = () => {
  return (
    <Menu label="Click">
      <MenuItem label="Copy" />
      <MenuItem label="Paste" />
      <MenuItem label="Export" />
      <MenuItem label="Settings" />
    </Menu>
  );
};
