import { InstructorsService } from './../services/instructors/instructors.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmComponent } from '../components/confirm/confirm.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-admin-instructors-list',
  templateUrl: './admin-instructors-list.component.html',
  styleUrls: ['./admin-instructors-list.component.scss']
})
export class AdminInstructorsListComponent implements OnInit {
  totalPages = 0;
  totalInstructors: any;
  instructorsArray = [];
  reqPageNum = 0;
  pageSize = 8
  loading: boolean;
  lastPage = false;
  modalRef: BsModalRef;
  disableScroll: Boolean;
  constructor(private modalService: BsModalService,
    private translate: TranslateService, private _toast: ToastService, private _instructors: InstructorsService) { }

  ngOnInit(): void {
    this.getAllInstructors()

  }
  getAllInstructors(mobile?, email?) {
    // console.log(this.reqPageNum, this.totalPages, this.lastPage);
    if (this.lastPage || this.loading) {
      return false;
    }
    this.loading = true
    this._instructors.getAllInstructors(this.reqPageNum, this.pageSize, mobile, email).subscribe(res => {
      if (res['statusCodeValue'] === 204) {
        this.lastPage = true
        this.loading = false
        console.log(this.instructorsArray);
        return
      } else {
        console.log(res);
        this.reqPageNum += 1;
        this.totalPages = res['totalPages']
        this.totalInstructors = res['totalElements']
        this.instructorsArray.push(...res['content'])
        this.loading = false
        this.lastPage = res['last']
      }

      // console.log(this.totalApprovedCourses);
      // console.log(this.approvedCoursesArray);
    }, err => {
      this.loading = false
      console.log(err);

    })
  }

  onScroll() {
    this.getAllInstructors()
  }
  onApproveClick(instructor) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to Approve this instructor? '),
        list: [
          `${this.translate.instant('instructor name:')} ${instructor.first_name}`,
          `${this.translate.instant('instructor mobile number:')} ${instructor.mobile}`,
          
        ],
        callback: (result) => {
          if (result) {
            this.approveInstructor(instructor.id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  approveInstructor(id: any) {
    this._instructors.approveInstructor(id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Activated Successfully"), 'success');
      this.resetTable()
      console.log(res);

    }, err => {
      console.log(err);

    })
  }
  onRejectClick(instructor) {
    this.modalRef = this.modalService.show(ConfirmComponent, {

      initialState: {
        prompt: this.translate.instant('Are you sure you want to reject this instructor? '),
        list: [
          `${this.translate.instant('instructor name:')} ${instructor.first_name}`,
          `${this.translate.instant('instructor mobile number:')} ${instructor.mobile}`,
          
        ],
        callback: (result) => {
          if (result) {
            this.rejectInstructor(instructor.id)
          } else {
            console.log('cancel');

          }
        }
      }
    });
  }
  rejectInstructor(id: any) {
    this._instructors.rejectInstructor(id).subscribe(res => {
      this._toast.showToast(this.translate.instant("Deactivated Successfully"), 'success');
      this.resetTable()
      console.log(res);
      console.log(res);

    }, err => {
      console.log(err);

    })
  }

  resetTable(getAllInstructors = true) {
    this.totalPages = 0;
    this.totalInstructors = 0
    this.instructorsArray = [];
    this.reqPageNum = 0;
    this.lastPage = false;
    getAllInstructors ? this.getAllInstructors() : null
  }
}
