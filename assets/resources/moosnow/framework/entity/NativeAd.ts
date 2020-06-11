import EntityLogic from "../framework/entity/EntityLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NativeAd extends EntityLogic {


    @property(cc.Sprite)
    baseBox: cc.Sprite = null;

    @property(cc.Sprite)
    logo: cc.Sprite = null;

    @property(cc.Sprite)
    btnTopClose: cc.Sprite = null;

    @property(cc.Sprite)
    btnClose: cc.Sprite = null;

    @property(cc.Sprite)
    btnOpen: cc.Sprite = null;

    @property(cc.Label)
    txtMemo: cc.Label = null;

    willShow(data) {
        super.willShow(data);
        console.log('显示原生广告')
        moosnow.platform.hideBanner();
        moosnow.platform.showNativeAd((row: nativeAdRow) => {
            console.log('原生广告', row)
            if (row && row.imgUrlList && row.imgUrlList.length > 0) {
                if (row.creativeType == 6) {
                    this.baseBox.node.height = this.baseBox.node.width / 2;
                }
                else {
                    this.baseBox.node.height = this.baseBox.node.width * (210 / 320);
                }
                this.txtMemo.string = row.desc;
                cc.loader.load(row.imgUrlList[0], (err, tex: cc.Texture2D) => {
                    if (err)
                        return;
                    console.log('native img  url ', row.creativeType, tex.url)
                    let spriteFrame = new cc.SpriteFrame(tex);
                    this.logo.spriteFrame = spriteFrame
                })
            }
            else {
                moosnow.platform.showBanner();
            }
        });

        moosnow.http.getAllConfig(res => {
            if (res && res.zs_native_click_switch == 1) {
                this.btnOpen.node.active = true;
                this.btnClose.node.active = false;
            }
            else {
                this.btnOpen.node.active = false;
                this.btnClose.node.active = true;
            }
        })

    }
    onShow() {
        this.node.zIndex = 999;
        this.addListener();
    }

    willHide() {
        this.remoteListener();
    }

    private addListener() {
        this.logo.node.on(cc.Node.EventType.TOUCH_END, this.onOpenAd, this)
        this.btnOpen.node.on(cc.Node.EventType.TOUCH_END, this.onOpenAd, this)
        this.btnTopClose.node.on(cc.Node.EventType.TOUCH_END, this.onCloseAd, this)
        this.btnClose.node.on(cc.Node.EventType.TOUCH_END, this.onCloseAd, this)

    }

    private remoteListener() {
        this.logo.node.off(cc.Node.EventType.TOUCH_END, this.onOpenAd, this)
        this.btnOpen.node.off(cc.Node.EventType.TOUCH_END, this.onOpenAd, this)
        this.btnTopClose.node.off(cc.Node.EventType.TOUCH_END, this.onCloseAd, this)
        this.btnClose.node.off(cc.Node.EventType.TOUCH_END, this.onCloseAd, this)
    }

    private onCloseAd() {
        Lite.entity.hideEntity(this, null)
    }

    private onOpenAd() {
        moosnow.platform.clickNative(() => {
            this.onCloseAd()
        });
    }


}
