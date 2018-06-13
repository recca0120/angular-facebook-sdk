import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [
  //       AppComponent
  //     ],
  //   }).compileComponents();
  // }));
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to facebook!');
  // }));

  it ('should login facebook', () => {
    const facebookService: any = {
      login: () => {}
    };

    const http: any = {
      post: () => {}
    }

    spyOn(facebookService, 'login').and.callFake(() => {
      return {
        subscribe: (cb) => {
          cb({
            name: "Recca Tsai", 
            id: "10156440680064181"
          });
        }
      }
    });

    spyOn(http, 'post').and.callFake(() => {
      return {
        subscribe: () => {
          return 'saved'
        }
      }
    });

    new AppComponent(facebookService, http);

    expect(facebookService.login).toHaveBeenCalled();
    expect(http.post).toHaveBeenCalled();
  })  
});
