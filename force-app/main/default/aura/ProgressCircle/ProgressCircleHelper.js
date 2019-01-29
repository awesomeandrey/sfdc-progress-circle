({
    xmlns: "http://www.w3.org/2000/svg",
    createProgressRing: function (params) {
        const {size, progress, variant = "brand"} = params,
            circleParams = this.computeCircleParameters(size),
            svgElement = this.createSvg(circleParams.dimension);

        // Circle group;
        const circleGroup = this.createGroupTag("circles__group"),
            backgroundCircle = this.createCircle(["circle__background", variant].join(" "), circleParams),
            progressCircle = this.createCircle("circle__progress", circleParams),
            offset = this.computeCircleDashOffset(progress, circleParams.r);
        progressCircle.setAttributeNS(null, "stroke-dashoffset", offset);
        circleGroup.appendChild(backgroundCircle);
        circleGroup.appendChild(progressCircle);

        // Legend group;
        const textGroup = this.createGroupTag(), text = this.createText(progress + "%", circleParams.legendParams);
        textGroup.appendChild(text);

        // Append element groups to SVG element;
        svgElement.appendChild(circleGroup);
        svgElement.appendChild(textGroup);
        return svgElement;
    },
    createSvg: function (dimension) {
        const svg = document.createElementNS(this.xmlns, "svg");
        svg.setAttributeNS(null, "width", this.toRem(dimension));
        svg.setAttributeNS(null, "height", this.toRem(dimension));
        return svg;
    },
    createGroupTag: function (className) {
        const gTag = document.createElementNS(this.xmlns, "g");
        gTag.setAttributeNS(null, "class", className || "");
        return gTag;
    },
    createCircle: function (className, circleParams) {
        const circle = document.createElementNS(this.xmlns, "circle");
        circle.setAttributeNS(null, "class", className);
        circle.setAttributeNS(null, "r", this.toRem(circleParams.r));
        circle.setAttributeNS(null, "cx", this.toRem(circleParams.cx));
        circle.setAttributeNS(null, "cy", this.toRem(circleParams.cy));
        circle.setAttributeNS(null, "stroke-width", this.toRem(circleParams.strokeWidth));
        circle.setAttributeNS(null, "fill", circleParams.fill);
        return circle;
    },
    createText: function (val, legendParams) {
        const text = document.createElementNS(this.xmlns, "text");
        text.setAttributeNS(null, "x", legendParams.x);
        text.setAttributeNS(null, "y", legendParams.y);
        text.setAttributeNS(null, "dy", legendParams.dy);
        text.setAttributeNS(null, "text-anchor", legendParams.textAnchor);
        text.setAttributeNS(null, "font-size", this.toRem(legendParams.fontSize));
        text.innerHTML = val;
        return text;
    },
    roundNumber: function (num) {
        return Number.parseFloat(num).toFixed(5);
    },
    toRem: function (num) {
        return this.roundNumber(num) + "rem";
    },
    computeCircleParameters: function (size) {
        let dimension = 0, rounder = this.roundNumber;
        switch (size) {
            case "small":
                dimension = 3;
                break;
            case "medium":
                dimension = 4;
                break;
            case "large":
                dimension = 5;
                break;
            default:
                dimension = 4;
                break;
        }
        return Object.create({
            dimension: rounder(dimension),
            r: rounder(dimension * 0.35), // 0.35 from dimension;
            cx: rounder(dimension * 0.5), // 0.5 from dimension;
            cy: rounder(dimension * 0.5), // 0.5 from dimension;
            strokeWidth: rounder(dimension * 0.06), // 0.06 from dimension;
            fill: "none",
            legendParams: {
                fontSize: rounder(dimension * 0.23), // 0.23 from dimension;
                x: "50%", y: "50%", textAnchor: "middle", dy: "0.32em"
            }
        });
    },
    computeCircleDashOffset: function (progress, radius) {
        let circleLength = this.roundNumber(2 * Math.PI * radius);
        let offset = this.roundNumber(progress * circleLength / 100);
        return this.toRem(-offset);
    },
});