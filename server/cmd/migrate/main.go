package main

import (
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Usage: migrate [up|down]")
		os.Exit(1)
	}

	// TODO: Implement migration runner
	fmt.Printf("Running migrations: %s\n", os.Args[1])
}
