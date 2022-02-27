/// <reference types="vite/client" />
type KanjiListName = "joyo" | "jouyou" | "jinmeiyo" | "jinmeiyou" | "grade-1" | "grade-2" | "grade-3" | "grade-4" | "grade-5" | "grade-6" | "grade-8" | "all";

interface KanjiListObject {
	label: string,
	name: KanjiListName
}