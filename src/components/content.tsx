import type { ReactNode } from 'react';

type ContentProps = {
  children: ReactNode;
}

function Content(props: ContentProps) {
  return <main className="content">{props.children}</main>;
}

export default Content;