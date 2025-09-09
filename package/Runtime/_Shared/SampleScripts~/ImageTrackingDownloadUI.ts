import { Behaviour, DeviceUtilities, GameObject, NeedleXREventArgs, WebXRImageTracking } from "@needle-tools/engine";



/** 
 * Displays images that are being tracked in this sample 
 * and creates a little HTML UI for downloading them for testing
 */
export class ImageTrackingDownloadUI extends Behaviour {

    private _ui: HTMLElement | null = null;
    private _incubationsHint: HTMLElement | null = null;
    private _components: WebXRImageTracking[] = [];

    onEnable() {
        this._ui?.remove();

        // Find all ImageTracking components
        this._components = GameObject.findObjectsOfType(WebXRImageTracking);
        const container = document.createElement("div");
        container.style.cssText = `
            font-family: 'Roboto flex', Ariel;
            position: absolute;
            top: .5rem;
            left: 1rem;
            color: rgba(255, 255, 255, .7);
            line-height: 1.2em;
            display: flex;
            gap: 1em;
            max-width: 400px;
        `
        this.context.domElement.appendChild(container);
        this._ui = container;

        const textContainer = document.createElement("div");
        container.appendChild(textContainer);

        const header = document.createElement("h2");
        header.innerText = "Sample Images";
        textContainer.appendChild(header);

        const description = document.createElement("p");
        description.innerHTML = `Download the image and print it or you can also open the image in your browser
        <br><strong>Then enter AR and scan it with your camera.</strong>
        <br>Visit our <a target="_blank" href="https://docs.needle.tools/image-tracking">ImageTracking documentation</a> for more information.
        `;
        description.style.userSelect = "all";
        description.style.backdropFilter = "blur(5px)";
        description.style.borderRadius = ".5rem";
        description.style.padding = ".5rem 0";
        textContainer.appendChild(description);
        description.querySelectorAll("a").forEach(a => {
            a.style.color = "rgba(255, 255, 255, .8)";
            a.style.textDecoration = "underline";
        });

        for (const imageTracking of this._components) {
            this.createDownloadImageUI(imageTracking, container);
        }
    }
    onDisable(): void {
        this._ui?.remove();
    }

    update(): void {
        if (this.context.isInAR) {
            this._ui?.remove();
        }
        else if (this._ui && !this._ui.parentNode) {
            this.context.domElement.appendChild(this._ui!);
        }
    }

    onUpdateXR(args: NeedleXREventArgs): void {
        if (args.xr.frame && !("getImageTrackingResults" in args.xr.frame)) {
            if (!this._incubationsHint && this._ui && DeviceUtilities.isAndroidDevice()) {
                const hint = document.createElement("p");
                hint.style.cssText = `
                    background: rgba(255, 100, 100, .7);
                    border-radius: .5rem;
                    padding: .4rem;
                `
                hint.innerText = "WebXR ImageTracking is not enabled. Go to chrome://flags/#webxr-incubations and enable #webxr-incubations";
                this._ui.append(hint);
                this._incubationsHint = hint;
            }
        }
    }

    private createDownloadImageUI(imageTracking: WebXRImageTracking, container: HTMLElement) {
        if (!imageTracking.trackedImages) return;
        for (const imageModel of imageTracking.trackedImages) {
            if (!imageModel.image) continue;
            const a = document.createElement("a") as HTMLAnchorElement;
            a.href = imageModel.image;
            a.target = "_blank";
            // const imgName = imageModel.image.split("/").pop();
            // a.setAttribute("download", imgName ?? "image.png");
            container.appendChild(a);
            const img = document.createElement("img") as HTMLImageElement;
            img.src = imageModel.image;
            img.style.cssText = `
                flex: .5;
                min-width: 100px;
                max-width: 160px;
                height: auto;
                aspect-ratio: 1.3;
                object-fit: cover;
                background: rgba(0,0,0,0.5);
                border-radius: .5rem;
                border: 1px solid rgba(255,255,255,.9);
                box-shadow: 0 0 10px rgba(0,0,0,.2);
                margin-right: 1rem;
            `
            a.appendChild(img);
        }
    }

}