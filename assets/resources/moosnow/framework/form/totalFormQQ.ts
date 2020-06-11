import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";
import Common from "../utils/Common";


const { ccclass, property } = cc._decorator;

@ccclass
export default class totalFormQQ extends UIForm {

    @property(cc.Sprite)
    checked: cc.Sprite = null;

    @property(cc.Sprite)
    unchecked: cc.Sprite = null;

    @property(cc.Sprite)
    btnVideoReceive: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive: cc.Sprite = null;

    @property(cc.Sprite)
    btnReceive2: cc.Sprite = null;

    @property(cc.Node)
    btnMore: cc.Node = null;


    @property(cc.Label)
    levelCoin: cc.Label = null;
    public isMask: boolean = true;

    private mCheckedVideo: boolean = true;

    public addEvent() {
        this.unchecked.node.on(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnReceive2.node.on(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnVideoReceive.node.on(cc.Node.EventType.TOUCH_END, this.onVideoReceive, this)
        this.btnMore.on(cc.Node.EventType.TOUCH_END, this.showAppbox, this)
    }
    public removeEvent() {
        this.unchecked.node.off(cc.Node.EventType.TOUCH_END, this.onShareChange, this)
        this.btnReceive.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnReceive2.node.off(cc.Node.EventType.TOUCH_END, this.onReceive, this)
        this.btnVideoReceive.node.off(cc.Node.EventType.TOUCH_END, this.onVideoReceive, this)
        this.btnMore.off(cc.Node.EventType.TOUCH_END, this.showAppbox, this)
    }

    private showAppbox() {
        moosnow.platform.showAppBox(() => { }, false);
    }
    private onVideoReceive() {
        moosnow.platform.showVideo(res => {
            if (res == moosnow.VIDEO_STATUS.END) {
                this.receiveSuccess(this.mLevelCoinNum * 5)
            }
            else if (res == moosnow.VIDEO_STATUS.ERR) {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.ERR)
            }
            else {
                moosnow.ui.showToast(moosnow.VIDEO_MSG.NOTEND)
            }
        })
    }
    private onReceive() {
        this.receiveSuccess(this.mLevelCoinNum)
    }


    private receiveSuccess(coin: number) {
        moosnow.data.addCoin(coin);
        moosnow.data.saveCoin();
        moosnow.ui.hideUIForm(UIForms.TotalForm, null)
        moosnow.ui.pushUIForm(UIForms.HomeForm, null, () => {

        })
        moosnow.platform.showAppBox();
        // Lite.ui.pushUIForm(UIForms.EndForm, { level: this.FormData.level, levelShareCoinNum: this.mLevelShareCoinNum, ...this.FormData })
    }

    private onShareChange() {
        this.mCheckedVideo = !this.mCheckedVideo;
        this.changeUI();

    }

    private changeUI() {
        if (this.mCheckedVideo) {
            this.btnVideoReceive.node.active = true;
            this.btnReceive2.node.active = false
            this.checked.node.active = true;
        }
        else {

            this.btnVideoReceive.node.active = false;
            this.btnReceive2.node.active = true
            this.checked.node.active = false;
        }
    }

    public mLevelCoinNum: number = 0;
    public mLevelShareCoinNum: number = 0;
    onShow(data) {
        let { coin, shareCoin } = data;
        this.mLevelCoinNum = coin;
        this.mLevelShareCoinNum = shareCoin
        this.levelCoin.string = `${Common.formatMoney(this.mLevelCoinNum)}`
        this.addEvent();
        this.changeUI();
        this.mCheckedVideo = true;
        this.changeUI();
        moosnow.platform.stopRecord();
        moosnow.platform.showBanner();
        moosnow.platform.showAppBox(res => {
            console.log('show app box call back res ', res)
        })
    }

    willHide() {
        this.removeEvent();
        moosnow.platform.hideBanner();
    }



    // update (dt) {}
}
