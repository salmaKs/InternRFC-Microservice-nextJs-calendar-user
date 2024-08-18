"use client";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-neutral p-4 flex justify-between items-center">
      <div>
        <Link href="" passHref>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
          >
            Home
          </Button>
        </Link>
      </div>
    </nav>
  );
}
