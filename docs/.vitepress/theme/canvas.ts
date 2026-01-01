/**
 * 快速穿梭特效配置接口
 */
interface Config {
  starCount: number;
  speed: number;
  color: string;
}

/**
 * 星星对象接口
 */
interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

/**
 * 穿梭特效类封装
 */
class HyperDrive {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationId: number | null = null;
  private config: Config;

  constructor(canvasEl: HTMLCanvasElement, config?: Partial<Config>) {
    this.canvas = canvasEl;
    this.ctx = this.canvas.getContext("2d")!;

    // 默认配置
    this.config = {
      starCount: 800,
      speed: 20,
      color: "white",
      ...config,
    };

    this.initCanvas();
    this.initStars();

    // 监听窗口缩放
    window.addEventListener("resize", () => {
      this.initCanvas();
      this.initStars();
    });
  }

  /**
   * 1. 初始化画布尺寸
   */
  private initCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * 2. 初始化星星数据
   */
  public initStars(): void {
    const { width } = this.canvas;
    this.stars = [];
    for (let i = 0; i < this.config.starCount; i++) {
      this.stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * this.canvas.height - this.canvas.height / 2,
        z: Math.random() * width,
        prevZ: 0,
      });
    }
  }

  /**
   * 3. 核心绘图逻辑
   */
  private draw = (): void => {
    const { width, height } = this.canvas;
    const { ctx } = this;

    // 绘制半透明黑幕产生拖尾
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, width, height);

    // 将原点移至中心
    ctx.save();
    ctx.translate(width / 2, height / 2);

    this.stars.forEach((s) => {
      s.prevZ = s.z;
      s.z -= this.config.speed;

      // 越界重置
      if (s.z <= 0) {
        s.z = width;
        s.x = Math.random() * width - width / 2;
        s.y = Math.random() * height - height / 2;
        s.prevZ = s.z;
      }

      // 3D 投影到 2D
      const sx = (s.x / s.z) * (width / 2);
      const sy = (s.y / s.z) * (height / 2);
      const px = (s.x / s.prevZ) * (width / 2);
      const py = (s.y / s.prevZ) * (height / 2);

      // 绘制
      ctx.beginPath();
      ctx.strokeStyle = this.config.color;
      ctx.lineWidth = 2 * (1 - s.z / width);
      ctx.lineCap = "round";
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      ctx.stroke();
    });

    ctx.restore();
    this.animationId = requestAnimationFrame(this.draw);
  };

  /**
   * 4. 启动动画
   */
  public start(): void {
    if (!this.animationId) {
      this.draw();
    }
  }

  /**
   * 5. 停止动画
   */
  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

/**
 * 模块出口, 让其他模块可以调用, 由外部传入 canvas 比直接
 * 使用 JS 直接创建 canvas 的方式更合理, 因为可能需要考虑样式问题
 * @param canvasDom {HTMLCanvasElement}
 */
export const init = (canvasDom: HTMLCanvasElement) => {
  const hyperDrive = new HyperDrive(canvasDom, {
    speed: 25,
    starCount: 1000,
  });
  hyperDrive.start();
};
