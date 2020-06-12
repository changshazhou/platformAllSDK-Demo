import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import showEndOptions from "../../../../moosnowSdk/model/showEndOptions";

const { ccclass, property } = cc._decorator;

@ccclass
export default class endForm extends UIForm {

    @property(cc.Node)
    public btnWinReceive: cc.Node = null;

    @property(cc.Label)
    public coinText: cc.Label = null;

    @property(cc.Node)
    public winBox: cc.Node = null;


    @property(cc.Node)
    public failBox: cc.Node = null;

    @property(cc.Node)
    public btnFailReceive: cc.Node = null;


    public get FormData(): showEndOptions {
        return this.mFormData
    }
    /**
     * 是否有渐入渐出效果
     */
    public isPopEffect: boolean = false;
    /**
     * 是否需要蒙层
     */
    public isMask: boolean = false;

    public coin: number = 0;
    constructor() { super(); }

    onEnable() {
        this.addListener();
    }
    onDisable() {
        this.removeListener();
    }
    addListener() {

        this.btnWinReceive.on(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
        this.btnFailReceive.on(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
    }
    removeListener() {
        this.btnWinReceive.off(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
        this.btnFailReceive.off(cc.Node.EventType.TOUCH_END, this.receiveCoin, this);
    }
    willShow(data) {
        super.willShow(data);
        // Lite.data.setTryingSkin(null);
    }
    onShow(data: showEndOptions) {
        let isWin = data.isWin;
        let level = data.level;

        if (data) {
            moosnow.data.addCoin(parseInt("" + data.coinNum));
            moosnow.data.saveCoin();
        }

        this.winBox.active = isWin;
        this.failBox.active = !isWin


        this.node.zIndex = 7;
        moosnow.form.showAd(moosnow.AD_POSITION.CENTER | moosnow.AD_POSITION.MASK | moosnow.AD_POSITION.WAIT | moosnow.AD_POSITION.BACK, () => {
            moosnow.form.showAd(moosnow.AD_POSITION.NONE, () => { })
            if (this.FormData.hideEnd)
                moosnow.ui.hideUIForm(UIForms.EndForm, null);
            if (this.FormData.onReceive)
                this.FormData.onReceive();
            //回到首页

        }, 6)

    }
    willHide() {
        moosnow.platform.hideBanner();
    }
    public showStar(level, useTime) {



    }

    receiveCoin() {
        moosnow.data.addCoin(this.coin);
        moosnow.data.saveCoin();
        if (this.FormData.hideEnd) {
            moosnow.ui.hideUIForm(UIForms.EndForm, null);
        }
        if (this.FormData.onReceive)
            this.FormData.onReceive();
    }
}