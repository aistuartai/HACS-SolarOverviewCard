/**
 * Shared MDI path data.
 *
 * These paths are used by the stat panels, the flow diagram nodes and the
 * device chips. Keep them here so a tweak lands everywhere at once.
 */

export const MDI_SOLAR =
  'M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z';

export const MDI_BATTERY =
  'M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';

export const MDI_GRID =
  'M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z';

export const MDI_HOME =
  'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z';

/** Lightning bolt — fallback for devices and custom panels. */
export const MDI_DEVICE =
  'M7,2V13H10V22L17,10H13L17,2H7Z';
