const view = document.querySelector('div[data-view-name="home"]');
const main = document.querySelector('main');

export function homeView(ctx) {
    ctx.render(view);
}