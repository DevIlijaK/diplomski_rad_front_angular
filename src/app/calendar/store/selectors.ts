import {createFeatureSelector, createSelector, MemoizedSelector} from "@ngrx/store";
import {CalendarState} from "./state";


export const getSelectedDay = (state: CalendarState) => state.selectedDay;

export const selectCalendarState: MemoizedSelector<object, CalendarState> = createFeatureSelector<CalendarState>('calendar');

export const selectSelectedDay: MemoizedSelector<object, any> = createSelector(selectCalendarState, getSelectedDay);

