package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"

	// https://github.com/qax-os/excelize
	// https://habr.com/ru/articles/413563/
	"github.com/xuri/excelize/v2"

	// https://github.com/jackc/pgx
	"github.com/jackc/pgx/v5"

	"github.com/go-telegram/bot"
)

func main() {

	// EXCEL
	f := excelize.NewFile()
	defer func() {
		if err := f.Close(); err != nil {
			fmt.Println(err)
		}
	}()
	// Create a new sheet.
	index, err := f.NewSheet("Sheet2")
	if err != nil {
		fmt.Println(err)
		return
	}
	// Set value of a cell.
	f.SetCellValue("Sheet2", "A2", "Hello world.")
	f.SetCellValue("Sheet1", "B2", 100)
	// Set active sheet of the workbook.
	f.SetActiveSheet(index)
	// Save spreadsheet by the given path.
	if err := f.SaveAs("Book1.xlsx"); err != nil {
		fmt.Println(err)
	}

	// POSTGRES
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	// https://golangdocs.com/golang-postgresql-example
	// https://eax.me/golang-pgx/
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	var name string
	var weight int64
	err = conn.QueryRow(context.Background(), "select name, weight from widgets where id=$1", 42).Scan(&name, &weight)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Println(name, weight)

	// telegram bot
	// https://github.com/go-telegram/bot
	// https://github.com/go-telegram/ui

	// https://go-telegram-bot-api.dev/getting-started/
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	opts := []bot.Option{
		bot.WithDefaultHandler(handler),
	}

	b, err := bot.New("YOUR_BOT_TOKEN_FROM_BOTFATHER", opts...)
	if err != nil {
		panic(err)
	}

	b.Start(ctx)
}

// package main

// import (
//     "fmt"

//     "github.com/xuri/excelize/v2"
// )

// func main() {
//     f, err := excelize.OpenFile("Book1.xlsx")
//     if err != nil {
//         fmt.Println(err)
//         return
//     }
//     defer func() {
//         // Close the spreadsheet.
//         if err := f.Close(); err != nil {
//             fmt.Println(err)
//         }
//     }()
//     // Get value from cell by given worksheet name and cell reference.
//     cell, err := f.GetCellValue("Sheet1", "B2")
//     if err != nil {
//         fmt.Println(err)
//         return
//     }
//     fmt.Println(cell)
//     // Get all the rows in the Sheet1.
//     rows, err := f.GetRows("Sheet1")
//     if err != nil {
//         fmt.Println(err)
//         return
//     }
//     for _, row := range rows {
//         for _, colCell := range row {
//             fmt.Print(colCell, "\t")
//         }
//         fmt.Println()
//     }
// }
