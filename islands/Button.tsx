import { IS_BROWSER } from "$fresh/runtime.ts";

export default function Button(props: { label: string; onClick?: () => void }) {
  const handleClick = () => {
    if (IS_BROWSER && props.onClick) {
      props.onClick();
    }
  };

  return <button onClick={handleClick}>{props.label}</button>;
}
