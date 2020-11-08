import type { MutableRefObject, ReactText } from 'react';
import type { ViewStyle } from 'react-native';

export type Story = {
  /**
   * The ID of the story
   */
  id: string | number | any;
  /**
   * The URL to the video
   */
  video: string;
  /**
   * The URL to the avatar image
   */
  preview: string;
  /**
   * A flag to mark the Story as visualized
   */
  viewed: boolean;
};

export type GradientOptions = {
  /**
   * The colors list of the gradient border
   */
  colors: ReactText[];
  /**
   * Coordinates that declare the position that the gradient starts
   */
  start?: { x: number; y: number };
  /**
   * Coordinates that declare the position that the gradient ends
   */
  end?: { x: number; y: number };
  /**
   * Array of numbers that defining the location of each gradient color stop, mapping to the color with the same index in colors prop
   */
  locations?: number[];
  /**
   * Gradient container styles
   */
  style?: ViewStyle;
};

export type StoryPreviewItemProps = {
  /**
   * The Story information
   */
  story?: Story;
  /**
   * The index of the story to render
   */
  storyIndex?: number;
  /**
   * The onPress handler
   */
  onPress?: (story: Story, coords: Coords) => void;
  /**
   * The styles to be applied to the container
   */
  containerStyle?: ViewStyle;
  /**
   * The styles to be applied to the placeholder
   */
  placeholderStyle?: ViewStyle;
  /**
   * The size of the Avatar component
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | number;
  /**
   * The options of the linear gradient border
   */
  gradient?: GradientOptions;
  /**
   * Boolean used to set if story preview item must be rendered with animation and gradient border
   */
  shouldAnimate?: boolean;
};

export type StoryPreviewProps = {
  /**
   * An array of stories to be rendered
   */
  stories: Story[];
  /**
   * Styles for FlatList mini stories container
   */
  style?: ViewStyle;
  /**
   * Get Props for Story Preview Item component based on Story and Index
   */
  getStoryPreviewItemProps?: (
    story: Story,
    idx: number
  ) => StoryPreviewItemProps | any;
  /**
   * Callback fired when drag to next item
   */
  onStoryDetailItemNext?: (story: Story, idx: number) => any;
  /**
   * Callback fired when on back button press
   */
  onStoryDetailBackPress?: (story: Story, idx: number) => any;
  /**
   * Callback fired when performed click on preview
   */
  onStoryPreviewItemPress?: (story: Story, idx: number) => any;
  /**
   * Component for Header in Story Detail Item
   */
  StoryDetailItemHeader?: (
    props?: RenderStoryDetailItemProps
  ) => React.ReactElement | null;
  /**
   * Component for Footer in Story Detail Item
   */
  StoryDetailItemFooter?: (
    props?: RenderStoryDetailItemProps
  ) => React.ReactElement | null;
};

export type StoryDetailHeaderItemProps = {
  /**
   * The story content
   */
  story: Story;
  /**
   * A function to exit from the StoryDetail
   */
  goBack: () => any;
  /**
   * A callback to mute audio from video
   */
  mute: () => any;
  /**
   * It indicates if the video is muted or not
   */
  muted: boolean;
};

export type StoryDetailFooterItemProps = {
  /**
   * The story content
   */
  story: Story;
  /**
   * The duration of the video been rendered
   */
  videoDuration: number | string | null;
  /**
   * The progress of the video been rendered
   */
  videoProgress: number | string | null;
  /**
   * A function to exit from the StoryDetail
   */
  goBack: () => any;
};

export type StoryDetailItemProps = {
  /**
   * The story content
   */
  story: Story;
  /**
   * A boolean prop to enable play
   */
  isCurrentStory: boolean;
  /**
   * Callback fired when video ends
   */
  onVideoEnd: () => any;
  /**
   * A back button handler
   */
  onBackPress?: () => any;
  /**
   * A callback triggered when video touch starts
   */
  onVideoTouchStart?: () => any;
  /**
   * A callback triggered when video touch ends
   */
  onVideoTouchEnd?: () => any;
  /**
   * A component to render as the Header of the Story Detail Item
   */
  StoryDetailItemHeader?: (props?: RenderStoryDetailItemProps) => any;
  /**
   * A component to render as the Footer of the Story Detail Item
   */
  StoryDetailItemFooter?: (props?: RenderStoryDetailItemProps) => any;
};

export type StoryDetailItemLayoutProps = {
  /**
   * The header component
   */
  header?: React.ReactNode;
  /**
   * The content component
   */
  content?: React.ReactNode;
  /**
   * The footer component
   */
  footer?: React.ReactNode;
};

export type StoryDetailProps = {
  /**
   * The initial index of the Story to present
   */
  initial: number;
  /**
   * An array of stories to render
   */
  stories: Story[];
  /**
   * A prop to mark if we need to show the Story Detail
   */
  isVisible: boolean;
  /**
   * A prop to trigger animation
   */
  animated: boolean;
  /**
   * A back button handler callback
   */
  onBackPress: (idx: number) => any;
  /**
   * Callback fired when we move to the next story
   */
  onMoveToNextStory: (idx: number) => any;
  /**
   * A component to render as the Header of the Story Detail Item
   */
  StoryDetailItemHeader?: (
    props?: RenderStoryDetailItemProps
  ) => React.ReactElement | null;
  /**
   * A component to render as the Footer of the Story Detail Item
   */
  StoryDetailItemFooter?: (
    props?: RenderStoryDetailItemProps
  ) => React.ReactElement | null;
};

export type StoryDetailExpanderProps = {
  /**
   * Trigger animation visibility
   */
  isVisible?: boolean;
  /**
   * The duration of the animation
   */
  duration?: number;
  /**
   * Aditional styles to add to the animated view
   */
  style?: any;
  /**
   * Children components
   */
  children?: React.ReactNode;
};

export type Coords = {
  height?: number;
  width?: number;
  x: number;
  y: number;
};

export type OnAnimationEndCallback = () => void;

export type StoryDetailExpanderRefProps = {
  /**
   * A callback to fire expand-on-click animation
   */
  startExpandAnimation: (
    coords: Coords,
    onAnimationEnd: OnAnimationEndCallback
  ) => void;
  /**
   * A callback to revert expand-on-click animation
   */
  resetExpandAnimation: (onAnimationEnd: OnAnimationEndCallback) => void;
};

export type StoryDetailExpanderRef = MutableRefObject<StoryDetailExpanderRefProps | null>;

export type RenderStoryDetailItemProps = {
  /**
   * The story content
   */
  story: Story;
  /**
   * A function to exit from the StoryDetail
   */
  goBack: () => any;
  /**
   * A callback to mute audio from video
   */
  mute: () => any;
  /**
   * It indicates if the video is muted or not
   */
  muted: boolean;
  /**
   * The duration of the video been rendered
   */
  duration: number | string | null;
  /**
   * The progress of the video been rendered
   */
  progress: number | string | null;
};
