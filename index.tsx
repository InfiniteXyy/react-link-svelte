import * as React from "react";
import type { SvelteComponent } from "svelte";

const { memo, useLayoutEffect, useRef } = React;

export default function linkSvelte<P extends object>(SvelteApp: typeof SvelteComponent) {
  return memo<P>((props) => {
    const component = useRef<SvelteComponent>();
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      component.current = new SvelteApp({ target: ref.current!, props, hydrate: true });
      return () => component.current && component.current.$destroy();
    }, []);

    useLayoutEffect(() => {
      if (component.current) component.current.$set(props);
    }, [props]);

    if ((SvelteApp as any).render) {
      return <div ref={ref} dangerouslySetInnerHTML={{ __html: (SvelteApp as any).render(props).html }} />;
    }
    return <div ref={ref} />;
  });
}
