import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


import { UsuarioComponent } from './usuario.component';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';




@NgModule({ declarations: [
        UsuarioComponent,
    ],
    exports: [
        UsuarioComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [UsuarioRoutingModule,
        NgSelectModule,
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        MatCheckboxModule,
        SidebarModule,
        NavbarModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class UsuarioModule { }