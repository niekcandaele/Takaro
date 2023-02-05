use byteorder::{ByteOrder, LittleEndian};
use nix::sys::socket::{recv, MsgFlags};
use std::{mem::size_of, os::fd::RawFd};

use nix::sys::socket::send;
use serde::{Deserialize, Serialize};

pub struct Message {
    header: u64,
    payload: usize,
}

#[derive(Serialize, Deserialize)]
pub struct Payload {
    code: String,
    config: String,
}

pub fn send_u64(fd: RawFd, val: u64) -> Result<(), String> {
    let mut buf = [0u8; size_of::<u64>()].to_vec();
    LittleEndian::write_u64(&mut buf, val);
    send_loop(fd, &buf, size_of::<u64>().try_into().unwrap())?;
    Ok(())
}

pub fn recv_u64(fd: RawFd) -> Result<u64, String> {
    let mut buf = [0u8; size_of::<u64>()].to_vec();
    recv_loop(fd, &mut buf, size_of::<u64>().try_into().unwrap())?;
    let val = LittleEndian::read_u64(&buf);
    Ok(val)
}

/// Send `len` bytes from `buf` to a connection-oriented socket
pub fn send_loop(fd: RawFd, buf: &Vec<u8>, len: u64) -> Result<(), String> {
    let len: usize = len.try_into().map_err(|err| format!("{:?}", err))?;
    let mut send_bytes = 0;

    while send_bytes < len {
        let size = match send(fd, &buf[send_bytes..len], MsgFlags::empty()) {
            Ok(size) => size,
            Err(nix::Error::EINTR) => 0,
            Err(err) => return Err(format!("{:?}", err)),
        };
        send_bytes += size;
    }

    Ok(())
}

/// Receive `len` bytes from a connection-orriented socket
pub fn recv_loop(fd: RawFd, buf: &mut Vec<u8>, len: u64) -> Result<(), String> {
    let len: usize = len.try_into().map_err(|err| format!("{:?}", err))?;
    let mut recv_bytes = 0;

    while recv_bytes < len {
        let size = match recv(fd, &mut buf[recv_bytes..len], MsgFlags::empty()) {
            Ok(size) => size,
            Err(nix::Error::EINTR) => 0,
            Err(err) => return Err(format!("{:?}", err)),
        };
        recv_bytes += size;
    }

    Ok(())
}
