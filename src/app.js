export class App {
  configureRouter(config, router) {
    config.title = 'KCCS';
    config.map([
      { route: ['','monitor'], name: 'monitor', moduleId: 'monitor', nav: true, title:'Monitor' },
      { route: 'map', name: 'map', moduleId: 'map', nav: true, title:'Map' }
    ]);

    this.router = router;
  }
}
