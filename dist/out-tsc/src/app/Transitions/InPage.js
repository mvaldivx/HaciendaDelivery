export function customAlertoutAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperElem = baseEl.querySelector('.alert-wrapper');
    wrapperAnimation.addElement(wrapperElem);
    wrapperElem.style.top = '0';
    backdropAnimation.fromTo('opacity', 0.001, 0.3);
    wrapperAnimation.beforeStyles({ 'opacity': 1 });
    wrapperAnimation.fromTo('transform', 'translateY(0px)', `translateY(-${baseEl.clientHeight}px)`);
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36, .66, .3, .1, 1)')
        .duration(500)
        .add(wrapperAnimation)
        .add(backdropAnimation));
}
export function customAlertinAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const backdropAnimation = new AnimationC();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));
    const wrapperAnimation = new AnimationC();
    const wrapperElem = baseEl.querySelector('.alert-wrapper');
    wrapperAnimation.addElement(wrapperElem);
    wrapperElem.style.top = '0';
    backdropAnimation.fromTo('opacity', 0.001, 0.3);
    wrapperAnimation.beforeStyles({ 'opacity': 1 });
    wrapperAnimation.fromTo('transform', `translateY(-${baseEl.clientHeight}px)`, 'translateY(0px)');
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36, .66, .3, .1, 1)')
        .duration(500)
        .add(wrapperAnimation)
        .add(backdropAnimation));
}
//# sourceMappingURL=InPage.js.map