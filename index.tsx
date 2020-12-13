import * as React from "react";
import type { SvelteComponentDev, SvelteComponent } from "svelte/internal";

const { memo, useEffect, useRef } = React;

export default function linkSvelte<P extends object>(SvelteApp: typeof SvelteComponentDev) {
  return memo<P>((props) => {
    const component = useRef<SvelteComponent>();
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      component.current = new SvelteApp({ target: ref.current!, props });
      return () => component.current && component.current.$destroy();
    }, []);

    useEffect(() => {
      if (component.current) component.current.$set(props);
    }, [props]);

    return <div ref={ref} />;
  });
}
