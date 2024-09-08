import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { loadingReducer } from "./loading/loading.reducers";
import { loginReducer } from "./login/login.reducers";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "./login/login.effects";
import { registerReducer } from './register/register.reducers';
import { RegisterEffects } from './register/register.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({}), // Pastikan ini kosong jika tidak ada reducer global
    StoreModule.forFeature('loading', loadingReducer),
    StoreModule.forFeature('login', loginReducer),
    StoreModule.forFeature("register", registerReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([LoginEffects]),
    RegisterEffects
  ]
})
export class AppStoreModule {}
