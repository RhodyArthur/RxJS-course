import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel } from '../common/debugger';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
        .pipe(debug(RxJsLoggingLevel.TRACE, "course value "));

        this.lessons$ = this.loadLessons();

    }

    ngAfterViewInit() {

        this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        .pipe(
            map(event => event.target.value),
            startWith(''),
            debug( RxJsLoggingLevel.INFO, "search"),
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(search => this.loadLessons(search))
        )


    }

    loadLessons(search=''): Observable<Lesson[]> {
            return createHttpObservable(`api/courses/lessons?courseId=${this.courseId}&pageSize=100`)
            .pipe(map(res => res["payload"])
            )
    }



}
