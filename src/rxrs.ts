// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...

import { BehaviorSubject, Observable } from 'rxjs';

export class RxRs {
  private topWindow: Window;
  private windowSizeSubjects: SizeSubjects = {};

  constructor() {
    this.topWindow = this.getWindow();
  }

  observe(query: string): Observable<boolean> {
    const mql = this.topWindow.matchMedia(query);
    let subject = this.windowSizeSubjects[mql.media];

    if (!subject) {
      this.windowSizeSubjects[mql.media] = new BehaviorSubject(mql.matches);
      mql.addListener(this.testQuery.bind(this));
      subject = this.windowSizeSubjects[mql.media];
    }

    return subject.asObservable();
  }

  private testQuery(e: any, subjects = this.windowSizeSubjects): void {
    const subject = subjects[e.media];
    if (subject) {
      subject.next(e.matches);
    }
  }

  private getWindow(): Window {
    return window.top;
  }
}

interface SizeSubjects {
  [key: string]: BehaviorSubject<boolean>;
}
