import { Routes } from '@angular/router';
import { Home } from './home';
import { EffectOrder } from './questions/q04-effect-order';
import { Derived } from './questions/q05-derived';
import { LateEffect } from './questions/q06-late-effect';
import { LateEffectFix } from './questions/q06-late-effect-fix';
import { PlainField } from './questions/q08-plain-field';
import { SignalField } from './questions/q08-signal-field';
import { Rename } from './questions/q09-rename';
import { RenameFix } from './questions/q09-rename-fix';
import { Q10, Q10Hidden } from './questions/q10-greeting';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'q4', component: EffectOrder },
  { path: 'q5', component: Derived },
  { path: 'q6', component: LateEffect },
  { path: 'q6-fix', component: LateEffectFix },
  { path: 'q8', component: PlainField },
  { path: 'q8-fix', component: SignalField },
  { path: 'q9', component: Rename },
  { path: 'q9-fix', component: RenameFix },
  { path: 'q10', component: Q10 },
  { path: 'q10-hidden', component: Q10Hidden },
];
