import { PropsWithChildren, useEffect, useRef } from "react";
import { merge } from "lodash-es";

interface LpWatermarkProps extends PropsWithChildren {
  width?: number;
  height?: number;
  text?: string;
  textStyle?: {
    color?: string;
    fontFamily?: string;
    fontSize?: number | string;
    fontWeight?: number | string;
  };
  image?: string;
  zIndex?: number;
  rotate?: number;
  gap?: [number, number];
  offset?: [number, number];
}

const defaultOptions: LpWatermarkProps = {
  width: 120,
  height: 64,
  textStyle: {
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.15)",
    fontFamily: "sans-serif",
    fontWeight: "normal",
  },
  rotate: -22,
  zIndex: 9,
  gap: [100, 100],
};

const toNum = (value?: string | number) => {
  return typeof value === "number" ? value : parseFloat(value as string);
};

const getCanvasData = async (options: Required<LpWatermarkProps>) => {
  const { text, textStyle, image, rotate, gap } = options;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const ratio = window.devicePixelRatio;

  const configCanvas = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    const canvasWidth = gap[0] + width;
    const canvasHeight = gap[1] + height;

    canvas.setAttribute("width", `${canvasWidth * ratio}px`);
    canvas.setAttribute("height", `${canvasHeight * ratio}px`);

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.translate((canvasWidth * ratio) / 2, (canvasHeight * ratio) / 2);
    ctx.scale(ratio, ratio);

    const RotateAngle = (rotate * Math.PI) / 180;
    ctx.rotate(RotateAngle);
  };

  const drawText = () => {
    const { fontSize, fontFamily, fontWeight, color } = textStyle;
    ctx.font = `${fontWeight} ${toNum(fontSize)}px ${fontFamily}`;
    const {
      width: textWidth,
      fontBoundingBoxAscent,
      fontBoundingBoxDescent,
    } = ctx.measureText(text);
    const angle = (rotate * Math.PI) / 180;
    const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent;
    const _textWidth = Math.ceil(
      Math.abs(Math.sin(angle) * textHeight) +
        Math.abs(Math.cos(angle) * textWidth)
    );
    const _textHeight = Math.ceil(
      Math.abs(Math.sin(angle) * textWidth) +
        Math.abs(textHeight * Math.cos(angle))
    );

    const width = options.width || _textWidth;
    const height = options.height || _textHeight;

    configCanvas({ width, height });

    ctx.font = `${fontWeight} ${toNum(fontSize)}px ${fontFamily}`;
    ctx.fillStyle = color!;
    ctx.textBaseline = "top";

    ctx.fillText(
      text,
      -_textWidth / 2,
      -(options.height || _textHeight) / 2,
      options.width || _textWidth
    );

    return Promise.resolve({ base64Url: canvas.toDataURL(), height, width });
  };

  const drawImage = () => {
    return new Promise<{ base64Url: string; width: number; height: number }>(
      (resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // 不携带 cookie
        img.referrerPolicy = "no-referrer"; // 不携带 referrer

        img.src = image;
        img.onload = () => {
          let { width, height } = options;
          if (!width || !height) {
            if (width) {
              height = (img.height / img.width) * +width;
            } else {
              width = (img.width / img.height) * +height;
            }
          }
          configCanvas({ width, height });

          ctx.drawImage(img, -width / 2, -height / 2, width, height);
          return resolve({ base64Url: canvas.toDataURL(), width, height });
        };
        img.onerror = () => {
          return drawText();
        };
      }
    );
  };
  return image ? drawImage() : drawText();
};

export const LpWatermark = (props: LpWatermarkProps) => {
  const options = merge(
    {},
    defaultOptions,
    props
  ) as Required<LpWatermarkProps>;
  const containerRef = useRef<HTMLDivElement>(null);
  const mutationObserver = useRef<MutationObserver>();

  const drawWatermark = async () => {
    const { base64Url, width, height } = await getCanvasData(options);
    const { offset, zIndex, gap } = options;
    const offsetLeft = offset?.[0] || 0 + "px";
    const offsetTop = offset?.[1] || 0 + "px";
    const wmStyle = `
      width:calc(100% - ${offsetLeft});
      height:calc(100% - ${offsetTop});
      position:absolute;
      top:${offsetTop};
      left:${offsetLeft};
      bottom:0;
      right:0;
      pointer-events: none;
      z-index:${zIndex};
      background-position: 0 0;
      background-size:${gap[0] + width}px ${gap[1] + height}px;
      background-repeat: repeat;
      background-image:url(${base64Url})`;
    const watermarkDiv = document.createElement("div");
    watermarkDiv.setAttribute("style", wmStyle);
    containerRef.current!.append(watermarkDiv);
    containerRef.current!.style.position = "relative";

    mutationObserver.current?.disconnect();

    mutationObserver.current = new MutationObserver((mutations) => {
      const isChanged = mutations.some((mutation) => {
        let flag = false;
        if (mutation.removedNodes.length) {
          flag = Array.from(mutation.removedNodes).some(
            (node) => node === watermarkDiv
          );
        }
        if (
          mutation.type === "attributes" &&
          mutation.target === watermarkDiv
        ) {
          flag = true;
        }
        return flag;
      });
      if (isChanged) {
        drawWatermark();
      }
    });

    mutationObserver.current.observe(containerRef.current!, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  };

  useEffect(() => {
    drawWatermark();
  }, []);
  return <div ref={containerRef}>{props.children}</div>;
};
