import respawnForm from "./respawnForm";

const { ccclass, property } = cc._decorator;

@ccclass
export default class respawnFormQQ extends respawnForm {

    public isMask: boolean = true

    willShow(data) {
        moosnow.platform.showBanner();
        super.willShow(data);
    }

    willHide() {
        super.willHide();
        moosnow.platform.hideBanner();
    }
}
