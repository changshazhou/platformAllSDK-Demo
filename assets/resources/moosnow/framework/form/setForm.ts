import UIForm from "../../framework/ui/UIForm";
import UIForms from "../../config/UIForms";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SetForm extends UIForm {

    @property(cc.Node)
    public closeBtn: cc.Node = null;

    @property(cc.Node)
    public btnVibrateOff: cc.Node = null;

    @property(cc.Node)
    public btnMusicOff: cc.Node = null;

    @property(cc.Node)
    public btnVibrateOn: cc.Node = null;

    @property(cc.Node)
    public btnMusicOn: cc.Node = null;

    public isPopEffect: boolean = false;
    public isMask: boolean = true;
    constructor() { super(); }

    start() {
        super.start();
        this.btnVibrateOff.on(cc.Node.EventType.TOUCH_END, this.vibrateSwitch, this)
        this.btnMusicOff.on(cc.Node.EventType.TOUCH_END, this.musicSwitch, this)
        this.btnVibrateOn.on(cc.Node.EventType.TOUCH_END, this.vibrateSwitch, this)
        this.btnMusicOn.on(cc.Node.EventType.TOUCH_END, this.musicSwitch, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.close, this)
        this.initData();
    }
    private initData() {

        this.btnVibrateOn.active = moosnow.data.getVibrateSetting()
        this.btnVibrateOff.active = !moosnow.data.getVibrateSetting()
        this.btnMusicOn.active = !moosnow.audio.isMute
        this.btnMusicOff.active = moosnow.audio.isMute
    }
    private vibrateSwitch() {
        moosnow.data.setVibrateSetting(!moosnow.data.getVibrateSetting());
        if (moosnow.data.getVibrateSetting()) {
            moosnow.platform.vibrateShort();
        }
        this.initData();
    }
    private musicSwitch() {
        moosnow.audio.isMute = !moosnow.audio.isMute;
        // cc.audioEngine.setVolume(moosnow.audio.MusicId, moosnow.audio.isMute ? 0 : 1)
        if (moosnow.audio.isMute)
            moosnow.audio.stopMusic();
        else
            moosnow.audio.playMainMusic();
        this.initData();
    }

    onShow() {
        moosnow.platform.showBanner();
        moosnow.http.getAllConfig(res => {
            if (res.setFormAd == 1) {
                moosnow.event.sendEventImmediately(moosnow.EVENT_TYPE.AD_VIEW_CHANGE, { showAd: moosnow.AD_POSITION.LEFTRIGHT })
            }
            else {
                moosnow.event.sendEventImmediately(moosnow.EVENT_TYPE.AD_VIEW_CHANGE, { showAd: moosnow.AD_POSITION.NONE })
            }
        })
    }
    willHide() {
        moosnow.platform.hideBanner();
    }

    private close(e: cc.Event.EventTouch) {

        if ([this.btnMusicOff.name, this.btnMusicOn.name, this.btnVibrateOff.name, this.btnVibrateOn.name]
            .indexOf(e.target.name) == -1) {
            moosnow.ui.hideUIForm(UIForms.SetForm, null)
        }
    }

}