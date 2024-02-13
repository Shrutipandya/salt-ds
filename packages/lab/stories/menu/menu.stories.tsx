import { Button, FlexLayout } from "@salt-ds/core";
import { Menu, MenuItem, MenuProps } from "@salt-ds/lab";

import { Meta, StoryFn } from "@storybook/react";
import { CopyIcon } from "@salt-ds/icons";
// import { ChevronRightIcon } from "@salt-ds/icons";
import { useState } from "react";

export default {
  title: "Lab/Menu",
  component: Menu,
} as Meta<typeof Menu>;

export const SingleLevel: StoryFn<MenuProps> = () => {
  const Trigger = (
    <span>
      <Button>Click</Button>
    </span>
  );
  return (
    <Menu label={Trigger}>
      <MenuItem label="Copy" />
      <MenuItem label="Paste" />
      <MenuItem label="Export" />
      <MenuItem label="Settings" />
    </Menu>
  );
};

export const MultiLevel: StoryFn<MenuProps> = () => {
  return (
    <Menu label="Click">
      <MenuItem label="Undo" onClick={() => console.log("Undo")} />
      <MenuItem label="Redo" disabled />
      <MenuItem label="Cut" />
      <Menu label="Copy as">
        <MenuItem label="Text" />
        <MenuItem label="Video" />
        <Menu label="Image">
          <MenuItem label=".png" />
          <MenuItem label=".jpg" />
          <MenuItem label=".svg" />
          <MenuItem label=".gif" />
        </Menu>
        <MenuItem label="Audio" />
      </Menu>
      <Menu label="Share">
        <MenuItem label="Mail" />
        <MenuItem label="Instagram" />
      </Menu>
    </Menu>

    // <Menu>
    //   <MenuTrigger>
    //     <Button>Click</Button>
    //   </MenuTrigger>
    //   <MenuPanel>
    //     <MenuItem>Copy</MenuItem>
    //     <MenuItem isNested>
    //       <MenuTrigger>Edit styling</MenuTrigger>
    //       <MenuPanel>
    //         <MenuItem>Copy</MenuItem>
    //         <MenuItem isNested>Edit styling</MenuItem>
    //         <MenuItem isNested>Clear styling</MenuItem>
    //         <MenuItem>Export</MenuItem>
    //         <MenuItem>Settings</MenuItem>
    //       </MenuPanel>
    //     </MenuItem>
    //     <MenuItem isNested>Clear styling</MenuItem>
    //     <MenuItem>Export</MenuItem>
    //     <MenuItem>Settings</MenuItem>
    //   </MenuPanel>
    // </Menu>
  );
};

// export const WithIcon: StoryFn<MenuProps> = () => {
//   return (
//     <Menu>
//       <MenuTrigger>
//         <Button>Click</Button>
//       </MenuTrigger>
//       <MenuPanel>
//         <MenuItem><CopyIcon />Copy</MenuItem>
//         <MenuItem isNested>Edit styling</MenuItem>
//         <MenuItem isNested>Clear styling</MenuItem>
//         <MenuItem>Export</MenuItem>
//         <MenuItem>Settings</MenuItem>
//       </MenuPanel>
//     </Menu>
//   );
// };

// export const Controlled: StoryFn<MenuProps> = () => {
//   const [open, setOpen] = useState<boolean>();

//   const toggleOpen = () => {
//     setOpen((current) => !current);
//   };

//   return (
//     <FlexLayout direction="column">
//       <Button onClick={toggleOpen}>{open ? "Close menu" : "Open menu"}</Button>

//       <Menu defaultOpen={false} open={open}>
//         <MenuTrigger>
//           <Button>Click</Button>
//         </MenuTrigger>
//         <MenuPanel>
//           <MenuItem>Copy</MenuItem>
//           <MenuItem>Paste</MenuItem>
//           <MenuItem>Export</MenuItem>
//           <MenuItem>Settings</MenuItem>
//         </MenuPanel>
//       </Menu>
//     </FlexLayout>
//   );
// };
