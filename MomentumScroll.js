class MomentumScroll {
    // Works with linear interpolation and requestAnimationFrame:
    // Linear interpolation helps computing generating the points (x & y)
    // that are between the last scroll container position and it's current one
    // requestAnimationFrame allows to animate the process
    constructor (containerId, factor) {

        this.factor = factor

        this.sx = 0
        this.sy = 0
        this.dx = this.sx
        this.dy = this.sy
        
        document.addEventListener('DOMContentLoaded', () => {
            this.scrollContainer = document.getElementById(containerId)
            this.body = document.body
            this.scrollContainerHeight = this.scrollContainer.getBoundingClientRect().height

            window.addEventListener('scroll', () => {
                this.sx = window.scrollX;
                this.sy = window.scrollY;
            })

            this.smooth()
        })
    }

    smooth = () => {

        // Linear interpolation
        this.dx = this.li(this.dx, this.sx, this.factor);
        this.dy = this.li(this.dy, this.sy, this.factor);
        
        this.dx = Math.floor(this.dx * 100) / 100;
        this.dy = Math.floor(this.dy * 100) / 100;

        this.scrollContainer.style.transform = `translate3d(-${this.dx}px, -${this.dy}px, 0px)`;

        window.requestAnimationFrame(this.smooth)
    }

    li = (a, b, n) => {
        return (1 - n) * a + n * b;
    }
}

const easing = 'cubic-bezier(0,.99,.99,.99)'
const ms = new MomentumScroll('scroll-container', 0.1)